import * as vscode from 'vscode';
import { CommandManager } from './commands';
import { DataManager } from './dataManager';
import { ReopenItProvider } from './provider';

export function activate(context: vscode.ExtensionContext) {

	CommandManager.dataManager = new DataManager(context);

	//TODO fix the "auto-launch commands" bug
	/* context.subscriptions.push(
		vscode.commands.registerCommand('reopen-it.showOpenTabs', CommandManager.showOpenTabs()),
		vscode.commands.registerCommand('reopen-it.toggleFavourite', CommandManager.toggleFavourite()),
	); */

	vscode.window.registerTreeDataProvider('reopenIt',
		new ReopenItProvider(CommandManager.dataManager)
	);

	/* vscode.window.createTreeView('reopenIt', {
		treeDataProvider: new ReopenItProvider(CommandManager.dataManager)
	}); */
}

export function deactivate() {}