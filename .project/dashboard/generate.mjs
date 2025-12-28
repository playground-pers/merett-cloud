#!/usr/bin/env node

/**
 * .project Dashboard Generator
 *
 * Script agnóstico para generar datos JSON desde archivos markdown
 * en el directorio .project/ de cualquier proyecto.
 *
 * Uso: node .project/dashboard/generate.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const PROJECT_DIR = path.join(__dirname, '..');
const OUTPUT_FILE = path.join(__dirname, 'data.json');

/**
 * Lee un archivo de forma segura
 */
function readFileSafe(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf8');
    }
  } catch (error) {
    console.warn(`⚠️  No se pudo leer: ${filePath}`);
  }
  return null;
}

/**
 * Extrae el nombre del proyecto del high-level.md o README
 */
function extractProjectName() {
  const highLevel = readFileSafe(path.join(PROJECT_DIR, '1-high-level.md'));
  if (highLevel) {
    const match = highLevel.match(/^#\s+(.+?)(?:\n|$)/m);
    if (match) {
      // Limpiar emojis y caracteres especiales
      return match[1].replace(/[📋🎯🚀]/g, '').trim();
    }
  }

  // Fallback: nombre del directorio padre
  const parentDir = path.basename(path.join(PROJECT_DIR, '..'));
  return parentDir.charAt(0).toUpperCase() + parentDir.slice(1);
}

/**
 * Parsea checkboxes de markdown
 * Retorna { completed: [], pending: [] }
 */
function parseCheckboxes(content) {
  const completed = [];
  const pending = [];

  if (!content) return { completed, pending };

  const regex = /^(\s*)-\s*\[([ xX])\]\s*\*\*([A-Z]+-[\d.]+)\*\*:\s*(.+?)(?:\n|$)/gm;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const isCompleted = match[2].toLowerCase() === 'x';
    const task = {
      id: match[3],
      title: match[4].trim(),
      completed: isCompleted,
    };

    if (isCompleted) {
      completed.push(task);
    } else {
      pending.push(task);
    }
  }

  // Parsear también checkboxes simples sin ID formal
  const simpleRegex = /^(\s*)-\s*\[([ xX])\]\s*(.+?)(?:\n|$)/gm;
  while ((match = simpleRegex.exec(content)) !== null) {
    // Evitar duplicados (ya capturados arriba)
    if (match[3].startsWith('**')) continue;

    const isCompleted = match[2].toLowerCase() === 'x';
    const task = {
      id: null,
      title: match[3].trim(),
      completed: isCompleted,
    };

    if (isCompleted) {
      completed.push(task);
    } else {
      pending.push(task);
    }
  }

  return { completed, pending };
}

/**
 * Extrae tareas de un archivo de tareas
 */
function parseTasksFile(filePath) {
  const content = readFileSafe(filePath);
  if (!content) return [];

  const tasks = [];
  const lines = content.split('\n');
  let currentTask = null;

  for (const line of lines) {
    // Detectar inicio de tarea - acepta prefijos con números y puntos: BE-1.1, FE-2.5, etc.
    const taskMatch = line.match(/^-\s*\[([ xX])\]\s*\*\*([A-Z]+-[\d.]+)\*\*:\s*(.+)/);
    if (taskMatch) {
      if (currentTask) tasks.push(currentTask);
      currentTask = {
        id: taskMatch[2],
        title: taskMatch[3].trim(),
        completed: taskMatch[1].toLowerCase() === 'x',
        priority: 'medium',
        epic: null,
        assignee: null,
        estimation: null,
      };
      continue;
    }

    // Parsear propiedades de la tarea actual
    if (currentTask && line.trim().startsWith('- **')) {
      const propMatch = line.match(/-\s*\*\*(.+?)\*\*:\s*(.+)/);
      if (propMatch) {
        const key = propMatch[1].toLowerCase();
        const value = propMatch[2].trim();

        if (key === 'prioridad' || key === 'priority') {
          if (
            value.includes('🔴') ||
            value.toLowerCase().includes('alta') ||
            value.toLowerCase().includes('high')
          ) {
            currentTask.priority = 'high';
          } else if (
            value.includes('🟢') ||
            value.toLowerCase().includes('baja') ||
            value.toLowerCase().includes('low')
          ) {
            currentTask.priority = 'low';
          }
        } else if (key === 'épica' || key === 'epic') {
          currentTask.epic = value;
        } else if (key === 'asignado' || key === 'assignee' || key === 'assigned') {
          currentTask.assignee = value;
        } else if (key === 'estimación' || key === 'estimation') {
          currentTask.estimation = value;
        }
      }
    }
  }

  if (currentTask) tasks.push(currentTask);

  return tasks;
}

/**
 * Obtiene las tareas de cada columna del Kanban
 */
function getTasks() {
  const tasksDir = path.join(PROJECT_DIR, 'tasks');

  return {
    backlog: parseTasksFile(path.join(tasksDir, 'backlog.md')),
    inProgress: parseTasksFile(path.join(tasksDir, 'in-progress.md')),
    review: parseTasksFile(path.join(tasksDir, 'review.md')),
    completed: parseTasksFile(path.join(tasksDir, 'completed.md')),
    blocked: parseTasksFile(path.join(tasksDir, 'blocked.md')),
  };
}

/**
 * Extrae información del sprint activo
 */
function getActiveSprint() {
  const content = readFileSafe(path.join(PROJECT_DIR, 'sprints', 'active.md'));

  const sprint = {
    name: 'Sin sprint activo',
    status: 'none',
    objective: '',
    startDate: null,
    endDate: null,
    daysRemaining: null,
    progress: 0,
    tasks: {
      todo: 0,
      inProgress: 0,
      review: 0,
      done: 0,
      blocked: 0,
    },
    blockers: [],
  };

  if (!content) return sprint;

  // Extraer nombre del sprint
  const nameMatch = content.match(/\*\*Sprint\*\*\s*\|\s*(.+)/);
  if (nameMatch) sprint.name = nameMatch[1].trim();

  // Extraer estado
  const statusMatch = content.match(/\*\*Estado\*\*\s*\|\s*(.+)/);
  if (statusMatch) {
    const status = statusMatch[1].toLowerCase();
    if (status.includes('activo') || status.includes('active')) {
      sprint.status = 'active';
    } else if (status.includes('completado') || status.includes('completed')) {
      sprint.status = 'completed';
    } else if (status.includes('planificado') || status.includes('planned')) {
      sprint.status = 'planned';
    }
  }

  // Extraer objetivo
  const objectiveMatch = content.match(/## 🎯 Objetivo del Sprint\s*\n\n(.+?)(?:\n\n|---)/s);
  if (objectiveMatch) sprint.objective = objectiveMatch[1].trim();

  // Extraer fechas
  const startMatch = content.match(/\*\*Inicio\*\*\s*\|\s*(\d{4}-\d{2}-\d{2})/);
  const endMatch = content.match(/\*\*Fin\*\*\s*\|\s*(\d{4}-\d{2}-\d{2})/);

  if (startMatch) sprint.startDate = startMatch[1];
  if (endMatch) {
    sprint.endDate = endMatch[1];
    const endDate = new Date(endMatch[1]);
    const today = new Date();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    sprint.daysRemaining = Math.max(0, diffDays);
  }

  // Contar tareas por estado en el contenido del sprint
  const { completed, pending } = parseCheckboxes(content);
  sprint.tasks.done = completed.length;
  sprint.tasks.todo = pending.length;

  // Calcular progreso
  const total = completed.length + pending.length;
  if (total > 0) {
    sprint.progress = Math.round((completed.length / total) * 100);
  }

  return sprint;
}

/**
 * Verifica si un texto es un placeholder/ejemplo
 */
function isPlaceholder(text) {
  if (!text) return true;
  const placeholderPatterns = [
    /\[.*\]/, // Contiene corchetes [algo]
    /nombre/i, // Contiene "nombre"
    /example/i, // Contiene "example"
    /ejemplo/i, // Contiene "ejemplo"
    /placeholder/i, // Contiene "placeholder"
    /título/i, // Contiene "título"
    /title/i, // Contiene "title"
    /descripción/i, // Contiene "descripción"
    /description/i, // Contiene "description"
    /^XX+$/, // Solo XX o XXX
    /^\d+$/, // Solo números
  ];
  return placeholderPatterns.some(pattern => pattern.test(text));
}

/**
 * Extrae información de las épicas
 */
function getEpics() {
  const epicsDir = path.join(PROJECT_DIR, 'epics');
  const epics = [];

  // Leer el README de épicas para el índice
  const indexContent = readFileSafe(path.join(epicsDir, 'README.md'));
  if (!indexContent) return epics;

  // Buscar tabla de índice
  const tableRegex = /\|\s*([A-Z]+-\d+)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(\d+)%\s*\|/g;
  let match;

  while ((match = tableRegex.exec(indexContent)) !== null) {
    const epicName = match[2].trim().replace(/\[|\]/g, '');

    // Ignorar épicas que son placeholders/ejemplos
    if (isPlaceholder(epicName)) {
      continue;
    }

    const status = match[3].toLowerCase();
    let statusValue = 'pending';

    if (status.includes('progreso') || status.includes('progress')) {
      statusValue = 'in-progress';
    } else if (status.includes('completad') || status.includes('done')) {
      statusValue = 'completed';
    } else if (status.includes('bloquead') || status.includes('blocked')) {
      statusValue = 'blocked';
    }

    epics.push({
      id: match[1],
      name: epicName,
      status: statusValue,
      sprints: match[4].trim(),
      progress: parseInt(match[5], 10),
    });
  }

  // Si no hay tabla, buscar archivos de épicas
  if (epics.length === 0) {
    try {
      const files = fs.readdirSync(epicsDir);
      for (const file of files) {
        if (file.startsWith('epic-') && file.endsWith('.md')) {
          const epicContent = readFileSafe(path.join(epicsDir, file));
          if (epicContent) {
            const idMatch = epicContent.match(/# (EPIC-\d+):/);
            const nameMatch = epicContent.match(/# EPIC-\d+:\s*(.+)/);

            if (idMatch) {
              epics.push({
                id: idMatch[1],
                name: nameMatch ? nameMatch[1].trim() : 'Sin nombre',
                status: 'pending',
                sprints: '',
                progress: 0,
              });
            }
          }
        }
      }
    } catch (error) {
      // Directorio vacío o no existe
    }
  }

  return epics;
}

/**
 * Extrae decisiones (ADRs)
 */
function getDecisions() {
  const decisionsDir = path.join(PROJECT_DIR, 'decisions');
  const decisions = [];

  try {
    const files = fs.readdirSync(decisionsDir);
    for (const file of files) {
      if (file.startsWith('ADR-') && file.endsWith('.md')) {
        const content = readFileSafe(path.join(decisionsDir, file));
        if (content) {
          const idMatch = file.match(/ADR-(\d+)/);
          const titleMatch = content.match(/# ADR-\d+:\s*(.+)/);
          const statusMatch = content.match(/## Estado\s*\n\s*(.+)/);

          decisions.push({
            id: idMatch ? `ADR-${idMatch[1]}` : file,
            title: titleMatch ? titleMatch[1].trim() : 'Sin título',
            status: statusMatch ? statusMatch[1].trim().toLowerCase() : 'unknown',
            file: file,
          });
        }
      }
    }
  } catch (error) {
    // Directorio vacío o no existe
  }

  return decisions;
}

/**
 * Calcula métricas generales
 */
function calculateMetrics(tasks, epics, sprint) {
  const allTasks = [
    ...tasks.backlog,
    ...tasks.inProgress,
    ...tasks.review,
    ...tasks.completed,
    ...tasks.blocked,
  ];

  const totalTasks = allTasks.length;
  const completedTasks = tasks.completed.length;
  const blockedTasks = tasks.blocked.length;
  const inProgressTasks = tasks.inProgress.length;

  // Contar bugs (asumiendo que tienen BUG- en el ID)
  const bugs = allTasks.filter(t => t.id && t.id.startsWith('BUG-')).length;
  const openBugs = allTasks.filter(t => t.id && t.id.startsWith('BUG-') && !t.completed).length;

  // Calcular progreso general del proyecto
  let projectProgress = 0;
  if (epics.length > 0) {
    const totalProgress = epics.reduce((sum, e) => sum + e.progress, 0);
    projectProgress = Math.round(totalProgress / epics.length);
  } else if (totalTasks > 0) {
    projectProgress = Math.round((completedTasks / totalTasks) * 100);
  }

  return {
    totalTasks,
    completedTasks,
    blockedTasks,
    inProgressTasks,
    pendingTasks: tasks.backlog.length,
    reviewTasks: tasks.review.length,
    bugs: {
      total: bugs,
      open: openBugs,
    },
    projectProgress,
    sprintProgress: sprint.progress,
  };
}

/**
 * Verifica qué secciones están definidas
 */
function checkDefinedSections() {
  const sections = {
    highLevel: fs.existsSync(path.join(PROJECT_DIR, '1-high-level.md')),
    architecture: fs.existsSync(path.join(PROJECT_DIR, '2-architecture.md')),
    techStack: fs.existsSync(path.join(PROJECT_DIR, '3-tech-stack.md')),
    database: fs.existsSync(path.join(PROJECT_DIR, '4-database-schema.md')),
    api: fs.existsSync(path.join(PROJECT_DIR, '5-api-specification.md')),
    deployment: fs.existsSync(path.join(PROJECT_DIR, '6-deployment-strategy.md')),
    epics: false,
    sprints: false,
    tasks: false,
    decisions: false,
    design: false,
    testing: false,
  };

  // Verificar si tienen contenido real (no solo README)
  const epicsDir = path.join(PROJECT_DIR, 'epics');
  if (fs.existsSync(epicsDir)) {
    const files = fs.readdirSync(epicsDir);
    sections.epics = files.some(f => f.startsWith('epic-'));
  }

  const sprintsDir = path.join(PROJECT_DIR, 'sprints');
  if (fs.existsSync(sprintsDir)) {
    const content = readFileSafe(path.join(sprintsDir, 'active.md'));
    sections.sprints = content && !content.includes('[Descripción del objetivo');
  }

  const tasksDir = path.join(PROJECT_DIR, 'tasks');
  if (fs.existsSync(tasksDir)) {
    const backlog = readFileSafe(path.join(tasksDir, 'backlog.md'));
    const inProgress = readFileSafe(path.join(tasksDir, 'in-progress.md'));
    // Aceptar múltiples prefijos con formato decimal: BE-1.1, FE-2.5, TASK-001, etc.
    const taskPrefixes = /\*\*(TASK-|BE-|FE-|TEST-|DEVOPS-|BUG-|TECH-|SPIKE-)[\d.]+\*\*/;
    sections.tasks =
      (backlog && taskPrefixes.test(backlog)) || (inProgress && taskPrefixes.test(inProgress));
  }

  const decisionsDir = path.join(PROJECT_DIR, 'decisions');
  if (fs.existsSync(decisionsDir)) {
    const files = fs.readdirSync(decisionsDir);
    sections.decisions = files.some(f => f.startsWith('ADR-'));
  }

  const designDir = path.join(PROJECT_DIR, 'design');
  if (fs.existsSync(designDir)) {
    const content = readFileSafe(path.join(designDir, 'design-system.md'));
    sections.design = content && !content.includes('#[hex]');
  }

  return sections;
}

/**
 * Función principal
 */
function main() {
  console.log('📊 Generando datos del dashboard...\n');

  const projectName = extractProjectName();
  const tasks = getTasks();
  const sprint = getActiveSprint();
  const epics = getEpics();
  const decisions = getDecisions();
  const metrics = calculateMetrics(tasks, epics, sprint);
  const definedSections = checkDefinedSections();

  const data = {
    generated: new Date().toISOString(),
    project: {
      name: projectName,
      lastUpdated: new Date().toISOString(),
    },
    sections: definedSections,
    sprint,
    epics,
    tasks,
    decisions,
    metrics,
  };

  // Escribir JSON
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2), 'utf8');

  console.log(`✅ Dashboard generado exitosamente!`);
  console.log(`📁 Archivo: ${OUTPUT_FILE}\n`);
  console.log('📈 Resumen:');
  console.log(`   • Proyecto: ${projectName}`);
  console.log(`   • Sprint: ${sprint.name} (${sprint.status})`);
  console.log(`   • Épicas: ${epics.length}`);
  console.log(`   • Tareas totales: ${metrics.totalTasks}`);
  console.log(`   • Completadas: ${metrics.completedTasks}`);
  console.log(`   • En progreso: ${metrics.inProgressTasks}`);
  console.log(`   • Bloqueadas: ${metrics.blockedTasks}`);
  console.log(`   • Progreso: ${metrics.projectProgress}%\n`);
  console.log('🌐 Abre index.html con Live Server para ver el dashboard');
}

// Ejecutar
main();
