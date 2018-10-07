declare var M;

export class MaterialService {
  constructor() {

  }
  static toast(message: string) {
    M.toast({html: message});

  }
}
