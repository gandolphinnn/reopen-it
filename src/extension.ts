import * as vscode from 'vscode';
import { CommandManager } from './commands';
import { DataManager } from './dataManager';

export function activate(context: vscode.ExtensionContext) {

	CommandManager.dataManager = new DataManager(context);

	context.subscriptions.push(
		vscode.commands.registerCommand('reopen-it.showOpenTabs', CommandManager.showOpenTabs()),
		vscode.commands.registerCommand('reopen-it.addFavourite', CommandManager.addFavourite()),
	);
}

export function deactivate() {}