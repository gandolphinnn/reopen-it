import * as vscode from 'vscode';
import * as fs from 'fs';


/* const jsonData = {
	"favorites": [
		{
			path: "C:\\Users\\user\\Documents\\workspace1\\project1"
		},
		{
			path: "C:\\Users\\user\\Documents\\workspace2\\project1",
			group: "group1"
		},
		{
			path: "C:\\Users\\user\\Documents\\workspace2\\project2",
			group: "group1"
		}
	],
	"workspaces": [
		{
			"name": "workspace1",
			"tabs": [
				{
					"path": "C:\\Users\\user\\Documents\\workspace1\\project1",
					"pinned": true
				},
				{
					"path": "C:\\Users\\user\\Documents\\workspace1\\project2",
					"pinned": false
				}
			],
			"folder": "C:\\Users\\user\\Documents\\workspace1"
		}
	]
} */
export type Favourite = { path: string, group?: string }; // NO group = "Favourites"
export type WorkspaceFile = { path: string, pinned: boolean };
export type Workspace = { name: string, tabs: WorkspaceFile[], folder: string };

export class DataManager {

	readonly storagePath: string;

	favorites: string[] = []; //TODO change to Favourite[]
	workspaces: Workspace[] = [];

	get stringify() {
		return JSON.stringify({ favorites: this.favorites, workspaces: this.workspaces });
	}

	constructor(context: vscode.ExtensionContext) {
		this.storagePath = context.globalStorageUri.fsPath;

		// Create the storage directory if it doesn't exist
		fs.existsSync(this.storagePath) || fs.mkdirSync(this.storagePath, { recursive: true });
		
		// Append the filename to the path
		this.storagePath = `${this.storagePath}/data.json`;

		// Create the storage file if it doesn't exist
		if (fs.existsSync(this.storagePath)) {
			this.readData();
		}
		else {
			fs.writeFileSync(this.storagePath, this.stringify);
		}
	}

	readData() {
		const data = fs.readFileSync(this.storagePath);
		const parsedData = JSON.parse(data.toString());
		this.favorites = parsedData.favorites;
		this.workspaces = parsedData.workspaces;
	}

	writeData() {
		fs.writeFileSync(this.storagePath, this.stringify);
	}

	addFavourite(path: string) {
		const index = this.favorites.indexOf(path);
	
		if (index !== -1) { throw new Error(); }

		this.favorites.push(path);
		this.writeData();
	}
	
	removeFavourite(path: string) {
		const index = this.favorites.indexOf(path);

		if (index === -1) { throw new Error(); }

		this.favorites.splice(index, 1);
		this.writeData();
	}
}