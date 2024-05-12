import * as vscode from 'vscode';
import { DataManager } from './dataManager';

export type CommandCallback = (...args: any[]) => any;

export class CommandManager {
	static dataManager: DataManager;

	static showOpenTabs: CommandCallback = () => {
		const titledDocs = vscode.workspace.textDocuments.filter(doc => !doc.isUntitled);
		vscode.window.showInformationMessage(`Open tabs: ${titledDocs.map(doc => doc.fileName).join('\n')}`);
	};
	
	static addFavourite: CommandCallback = () => {
		const docPath = vscode.window.activeTextEditor!.document.fileName;
		vscode.window.showInformationMessage(`Add ${docPath} to favourites`);
		this.dataManager.addFavourite(docPath);
	};
}