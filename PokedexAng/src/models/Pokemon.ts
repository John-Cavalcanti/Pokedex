// represents a single pokemon and its properties
export class Pokemon {
    private number: number;
    private name: string;
    private type: string = '';
    private types: string[] = [];
    private photoPath: string;

    private base_xp: string;
    private height: string;
    private weight: string;

	constructor($number: number, $name: string, $photoPath: string, $base_xp: string, $height: string, $weight: string, types: string[]) {
		this.number = $number;
		this.name = $name;
		this.photoPath = $photoPath;
		this.base_xp = $base_xp;
		this.height = $height;
		this.weight = $weight;

        this.setType(types);
	}
    
    public getNumber(): number
    {
        return this.number;
    }

    public getName(): string
    {
        return this.name;
    }

    public getType(): string
    {
        return this.type;
    }

    public getPhoto(): string
    {
        return this.photoPath;
    }

    public getPokemonXp(): string
    {
        return this.base_xp;
    }

    public getTypes(): string[]
    {
        return this.types;
    }

    public getHeight(): string
    {
        return this.height;
    }

    public getWeight(): string
    {
        return this.weight;
    }

    public setType(types: string[]):void {
        this.types = types;
        [this.type] = types;
    }

}
