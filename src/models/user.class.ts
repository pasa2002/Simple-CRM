export class User{
  firstName :string;
  lastName:string;
  birthDate:number;
  address:string;
  zipCode:number;
  city:string;
  email:string;
  experience:number;
  constructor(obj?:any){
    this.firstName = obj ? obj.firstName :'';
    this.lastName = obj ? obj.lastName :'';
    this.birthDate = obj ? obj.birthDate :'';
    this.address = obj ? obj.address :'';
    this.zipCode = obj ? obj.zipCode :'';
    this.city = obj ? obj.city :'';
    this.email = obj ? obj.email :'';
    this.experience = obj ? obj.experience :0;
  }

  public toJSON(){
    return{
      firstName :this.firstName,
      lastName:this.lastName ,
      birthDate: this.birthDate,
      address:this.address,
      zipCode:this.zipCode,
      city:this.city,
      email:this.email,
      experience:this.experience
    }
  }
}
