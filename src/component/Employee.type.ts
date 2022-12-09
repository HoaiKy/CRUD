export interface IEmployee{
    id: string;
    firstName: string;
    lastName: string;
    email: string
}

export const dummyEmployeeList : IEmployee[]=[
    {
        id: new Date().toJSON().toString(),
        firstName: "Le",
        lastName: "Thi Hoai",
        email:"hoailt@gmail.com"
    },
    {
        id: new Date().toJSON().toString(),
        firstName: "Nguyen",
        lastName: "Thi Van",
        email:"vannt@gmail.com"
    },
    {
        id: new Date().toJSON().toString(),
        firstName: "Le",
        lastName: "Trong Ky",
        email:"kylt@gmail.com"
    },
]
export  enum PageEnum{
    list,
    add,
    edit,
    link
}