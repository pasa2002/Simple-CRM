export class Players{
  firstName:string;
  lastName:string;
  email:string;
  date:number;
  gender:string;
  playerLevel:string;
  oldTeam:string;
  experience:number;
  salary:number;
  about:string;
  customIdName: string;

  constructor(obj?: any) {
    this.firstName = obj?.firstName || '';
    this.lastName = obj?.lastName || '';
    this.email = obj?.email || '';
    this.date = obj?.date || Date.now();
    this.gender = obj?.gender || 'male';
    this.playerLevel = obj?.playerLevel || '';
    this.oldTeam = obj?.oldTeam || '';
    this.experience = obj?.experience || 0;
    this.salary = obj?.salary || 0;
    this.about = obj?.about || '';
    this.customIdName = obj?.customIdName || '';
  }


  public toJson(){
    return{
      firstName :this.firstName,
      lastName :this.lastName,
      email :this.email,
      date :this.date,
      gender :this.gender,
      playerLevel :this.playerLevel,
      oldTeam :this.oldTeam,
      experience :this.experience,
      salary :this.salary,
      about :this.about,
      customIdName :this.customIdName
    }
  }

}
