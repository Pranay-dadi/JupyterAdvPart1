import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { ICommandPalette, ToolbarButton } from '@jupyterlab/apputils';
import { INotebookTracker } from '@jupyterlab/notebook';
import { generateCodeFromDescription, explainSelectedCode, measurePerformance, predictCodeBehavior,detectBugsInCell,detectAndResolveErrors,setupRealTimeFeedback,showLibraryVersions,analyzeVisualizations,generateDependencyGraph,showNotebookStatistics} from './commands';

/**
 * Initialization data for the ai-code-assistant extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_adv:plugin',
  description: 'A JupyterLab extension with AI-powered code assistant and enhanced performance metrics.',
  autoStart: true,
  requires: [ICommandPalette, INotebookTracker],
  activate: (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    notebookTracker: INotebookTracker
  ) => {
    console.log('JupyterLab extension jupyter_adv is activated!');
    
    const dependencyGraphCommand = 'ai:dependency-graph';
    app.commands.addCommand(dependencyGraphCommand, {
      label: 'Generate Dependency Graph',
      execute: () => {
        const current = notebookTracker.currentWidget;
        if (current) {
          generateDependencyGraph(current);
        } else {
          console.warn('No active notebook found.');
        }
      }
    });
    palette.addItem({ command: dependencyGraphCommand, category: 'Notebook Tools' });

    const notebookStatsCommand = 'ai:notebook-stats';
    app.commands.addCommand(notebookStatsCommand, {
      label: 'Show Notebook Statistics',
      execute: () => {
        const current = notebookTracker.currentWidget;
        if (current) {
          showNotebookStatistics(current);
        } else {
          console.warn('No active notebook found.');
        }
      }
    });
    palette.addItem({ command: notebookStatsCommand, category: 'Notebook Tools' });
    
    const analyzeVisualizationsCommand = 'ai:analyze-visualizations';
    app.commands.addCommand(analyzeVisualizationsCommand, {
      label: 'Analyze Visualizations',
      execute: () => {
        const current = notebookTracker.currentWidget;
        if (current) {
          analyzeVisualizations(current); // Call the new function
        } else {
          console.warn('No active notebook found.');
        }
      }
    });
    palette.addItem({ command: analyzeVisualizationsCommand, category: 'AI Assistant' });

    const libraryVersionsCommand = 'ai:show-library-versions';
    app.commands.addCommand(libraryVersionsCommand, {
      label: 'Show Library Versions',
      execute: () => {
        const current = notebookTracker.currentWidget;
        if (current) {
          showLibraryVersions(current); // Call the new function
        } else {
          console.warn('No active notebook found.');
        }
      }
    });
    palette.addItem({ command: libraryVersionsCommand, category: 'AI Assistant' });
    // Command to generate code from description
    const generateCommand = 'ai:generate-code';
    app.commands.addCommand(generateCommand, {
      label: 'Generate Code from Description',
      execute: () => {
        const current = notebookTracker.currentWidget;
        if (current) {
          generateCodeFromDescription(current);
        } else {
          console.warn('No active notebook found.');
        }
      }
    });
    palette.addItem({ command: generateCommand, category: 'AI Assistant' });

    // Command to explain selected code
    const explainCommand = 'ai:explain-code';
    app.commands.addCommand(explainCommand, {
      label: 'Explain Selected Code',
      execute: () => {
        const current = notebookTracker.currentWidget;
        if (current) {
          explainSelectedCode(current);
        } else {
          console.warn('No active notebook found.');
        }
      }
    });
    palette.addItem({ command: explainCommand, category: 'AI Assistant' });

    // Command to measure performance
    const measureCommand = 'ai:measure-performance';
    app.commands.addCommand(measureCommand, {
      label: 'Measure Performance',
      execute: () => {
        const current = notebookTracker.currentWidget;
        if (current) {
          measurePerformance(current);
        } else {
          console.warn('No active notebook found.');
        }
      }
    });
    palette.addItem({ command: measureCommand, category: 'AI Assistant' });

    const predictCommand = 'ai:predict-behavior';
    app.commands.addCommand(predictCommand, {
      label: 'Predict Code Behavior',
      execute: () => {
        const current = notebookTracker.currentWidget;
        if (current) predictCodeBehavior(current);
      }
    });
    palette.addItem({ command: predictCommand, category: 'AI Assistant' });

    const detectBugsCommand = 'ai:detect-bugs';
    app.commands.addCommand(detectBugsCommand, {
      label: 'Detect Bugs in Code',
      execute: () => {
        const current = notebookTracker.currentWidget;
        if (current) {
          detectBugsInCell(current);
        } else {
          console.warn('No active notebook found.');
        }
      }
    });
    palette.addItem({ command: detectBugsCommand, category: 'AI Assistant' });

    const detectErrorsCommand = 'ai:detect-errors';
    app.commands.addCommand(detectErrorsCommand, {
      label: 'Detect and Resolve Errors',
      execute: () => {
        const current = notebookTracker.currentWidget;
        if (current) {
          detectAndResolveErrors(current);
        } else {
          console.warn('No active notebook found.');
        }
      }
    });
    palette.addItem({ command: detectErrorsCommand, category: 'AI Assistant' });

    // Add buttons to notebook toolbar
    notebookTracker.widgetAdded.connect((sender, panel) => {
      setupRealTimeFeedback(panel);
      const measureButton = new ToolbarButton({
        label: 'Measure Performance',
        onClick: () => app.commands.execute(measureCommand)
      });
      const predictButton = new ToolbarButton({
        label: 'Predict Behavior',
        onClick: () => app.commands.execute(predictCommand)
      });
      const detectBugsButton = new ToolbarButton({
        label: 'Detect Bugs',
        onClick: () => app.commands.execute(detectBugsCommand)
      });
      const detectErrorsButton = new ToolbarButton({
        label: 'Detect Errors',
        onClick: () => app.commands.execute(detectErrorsCommand)
      });
      const generateCodeButton = new ToolbarButton({
        label: 'Generate Code',
        onClick: () => app.commands.execute(generateCommand)
      });
      const explainButton = new ToolbarButton({
        label: 'Explain Code',
        onClick: () => app.commands.execute(explainCommand)
      });
      const libraryVersionsButton = new ToolbarButton({
        label: 'Library Versions',
        onClick: () => app.commands.execute(libraryVersionsCommand)
      });

      const analyzeVisualizationsButton = new ToolbarButton({
        label: 'Analyze Visualizations',
        onClick: () => app.commands.execute(analyzeVisualizationsCommand)
      });
      const dependencyGraphButton = new ToolbarButton({
        label: 'Dependency Graph',
        onClick: () => app.commands.execute(dependencyGraphCommand)
      });
      const notebookStatsButton = new ToolbarButton({
        label: 'Notebook Stats',
        onClick: () => app.commands.execute(notebookStatsCommand)
      });
      panel.toolbar.insertItem(10, 'generateCode', generateCodeButton);
      panel.toolbar.insertItem(11, 'explainCode', explainButton);
      panel.toolbar.insertItem(12, 'detectErrors', detectErrorsButton);
      panel.toolbar.insertItem(10, 'measurePerformance', measureButton);
      panel.toolbar.insertItem(11, 'predictBehavior', predictButton);
      panel.toolbar.insertItem(12, 'detectBugs', detectBugsButton);
      panel.toolbar.insertItem(16, 'libraryVersions', libraryVersionsButton);
      panel.toolbar.insertItem(17, 'analyzeVisualizations', analyzeVisualizationsButton);
      panel.toolbar.insertItem(18, 'dependencyGraph', dependencyGraphButton);
      panel.toolbar.insertItem(20, 'notebookStats', notebookStatsButton);
    });
  }
};

export default plugin;