export interface Job{
    id: string;
    title: string;
    description: string;
    pay: Number;
    location: string;
    contact?: string;
   type: string;
    company: string ;
   skills: string[],
   image?: ""| undefined,
   employmentType: string,
   duration: string,
   experienceLevel?:string,
   postedDate?:string,

}
