export class User{
  firstName :string;
  lastName:string;
  address:string;
  zipCode:number;
  city:string;
  email:string;
  investedAmount:number;
  notes:string;

  constructor(obj?:any){
    this.firstName = obj ? obj.firstName :'';
    this.lastName = obj ? obj.lastName :'';
    this.address = obj ? obj.address :'';
    this.zipCode = obj ? obj.zipCode :'';
    this.city = obj ? obj.city :'';
    this.email = obj ? obj.email :'';
    this.investedAmount = obj ? obj.investedAmount :'';
    this.notes = obj ? obj.notes : '';
  }

  public toJSON(){
    return{
      firstName :this.firstName,
      lastName:this.lastName ,
      address:this.address,
      zipCode:this.zipCode,
      city:this.city,
      email:this.email,
      investedAmount:this.investedAmount,
      notes:this.notes
    }
  }
}
