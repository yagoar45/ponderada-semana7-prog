export abstract class GptAbstract {

    abstract createHistoryDetails():  Promise<{title: string, description: string, category: string}> ;
}
