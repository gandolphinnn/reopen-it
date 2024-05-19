import * as vscode from 'vscode';
import * as fs from 'fs';

/**
{
	"favorites": [
		"C:\\Users\\user\\Documents\\workspace1\\project1",
		"C:\\Users\\user\\Documents\\workspace2\\project1",
		"C:\\Users\\user\\Documents\\workspace2\\project2"
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
			]
			"folder": "C:\\Users\\user\\Documents\\workspace1"
		}
	]
}
 */
export type WorkspaceFile = { path: string, pinned: boolean };
export type Workspace = { name: string, tabs: WorkspaceFile[], folder: string };

export class DataManager {


	favorites: string[] = [];
	workspaces: Workspace[] = [];

	get stringify() {
		return JSON.stringify({ favorites: this.favorites, workspaces: this.workspaces });
	}

	constructor(public readonly storagePath: string) {

		// Create the storage directory if it doesn't exist
		fs.existsSync(this.storagePath) || fs.mkdirSync(this.storagePath, { recursive: true });
		
		// Append the filename to the path
		this.storagePath = `${this.storagePath}\\data.json`;

		// Create the storage file if it doesn't exist
		if (fs.existsSync(this.storagePath)) {
			this.readData();
		}
		else {
			fs.writeFileSync(this.storagePath, this.stringify);
			console.log(`Created data file at ${this.storagePath}`);
		}
	}
	
	private readData() {
		const data = fs.readFileSync(this.storagePath);
		const parsedData = JSON.parse(data.toString());
		console.log(`Read ${parsedData} from ${this.storagePath}`);
		this.favorites = parsedData.favorites;
		this.workspaces = parsedData.workspaces;
	}

	save() {
		fs.writeFileSync(this.storagePath, this.stringify);
	}

	addFavourite(path: string) {
		const index = this.favorites.indexOf(path);
	
		if (index !== -1) {
			return false;
		}

		this.favorites.push(path);
		this.save();
		return true;
	}
	
	removeFavourite(path: string) {
		const index = this.favorites.indexOf(path);

		if (index === -1) {
			return false;
		}

		this.favorites.splice(index, 1);
		this.save();
		return true;
	}
}