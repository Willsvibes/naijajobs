export interface Job{
    id: string | number;
    title: string;
    description: string;
    pay: number | string;
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
   createdBy: string;
}
