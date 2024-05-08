import * as vscode from 'vscode';
import * as fs from 'fs';

/**
	{
		"favorites": [
			"C:\\Users\\user\\Documents\\workspace1\\project1",
			"C:\\Users\\user\\Documents\\workspace2\\project1",
			"C:\\Users\\user\\Documents\\workspace2\\project2"
		],
		"savedWorkspaces": [
			"workspace1": [
				{
					"path": "C:\\Users\\user\\Documents\\workspace1\\project1",
					"pinned": true
				},
				{
					"path": "C:\\Users\\user\\Documents\\workspace1\\project2",
					"pinned": false
				}
			]
		]
	}
 */
export type WorkspaceFile = { path: string, pinned: boolean };
export type Workspace = WorkspaceFile[];

export class DataManager {

	public readonly storagePath: string;

	public favorites: string[] = [];
	public savedWorkspaces: Workspace[] = [];

	constructor(context: vscode.ExtensionContext) {
		this.storagePath = context.globalStorageUri.fsPath;

		// Create the storage directory if it doesn't exist
		fs.existsSync(this.storagePath) || fs.mkdirSync(this.storagePath, { recursive: true });
		
		// Append the filename to the path
		this.storagePath = `${this.storagePath}/data.json`;

		// Create the storage file if it doesn't exist
		fs.existsSync(this.storagePath) || fs.writeFileSync(this.storagePath, JSON.stringify({}));
	}
	public readData() {
		const data = fs.readFileSync(this.storagePath);
		const parsedData = JSON.parse(data.toString());
		this.favorites = parsedData.favorites;
		this.savedWorkspaces = parsedData.savedWorkspaces;
	}

	public writeDate() {
		fs.writeFileSync(this.storagePath, JSON.stringify({ favorites: this.favorites, savedWorkspaces: this.savedWorkspaces }));
	}
}