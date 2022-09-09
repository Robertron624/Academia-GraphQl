import {IResolvers} from "@graphql-tools/utils";
import { database } from "../data/data.store";

const query : IResolvers = {
    Query : {
        estudiantes(): any {
            return database.estudiantes;
        },

        estudiante(__: void, {id}): any {
            const resultado = database.estudiantes.filter(estudiante => estudiante.id == id)[0];
            if(resultado === undefined){
                return{
                    id: '-1',
                    name: `No se ha encontrado al estudiante con id ${id}`,
                    email: '',
                    courses: []
                }
            }
            return resultado
        },

        cursos(): any {
            return database.cursos
        },

        curso(__: void, {curso}): any {
            const resultado = database.cursos.filter(curso_ => curso_.id == curso)[0];
            if(resultado === undefined){
                return{
                    id: '-1',
                    title: `No se ha encontrado el curso con el ID ${curso}`,
                    description: '',
                    clases: -1,
                    time: 0.0,
                    logo: '',
                    level: 'ALL',
                    path: '',
                    teacher: '',
                    reviews: [] 
                }
            }
            return resultado
        },
    }
}

export default query;