import * as vscode from 'vscode';

export type CommandCallback = (...args: any[]) => any;

export const showOpenTabs: CommandCallback = () => {
	const titledDocs = vscode.workspace.textDocuments.filter(doc => !doc.isUntitled);
	vscode.window.showInformationMessage(`Open tabs: ${getNames(titledDocs)}`);
};

function getNames(editors: vscode.TextDocument[]): string {
	return editors.map(editor => editor.fileName).join('\n');
}