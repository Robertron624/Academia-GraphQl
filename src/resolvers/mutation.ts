import {IResolvers} from "@graphql-tools/utils";
import _ from 'lodash';
import { database } from "../data/data.store";

const mutation : IResolvers = {
    Mutation : {
        cursoNuevo(__:void, { curso }): any {
            const ItemCurso = {
                id: String(database.cursos.length +1),
                title: curso.title,
                description: curso.description,
                clases: curso.clases,
                time: curso.clases,
                level: curso.level,
                logo: curso.logo,
                path: curso.path,
                teacher: curso.teacher,
                reviews: []
            } 

            if(database.cursos.filter( itemCurs => itemCurs.title == ItemCurso.title).length === 0){
                database.cursos.push(ItemCurso);
                return ItemCurso;
            }

            return {
                id: "-1",
                title: `El curso ya existe con este titulo`,
                description: '',
                clases: -1,
                time: 0.0,
                level: 'ALL',
                logo: '',
                path: '',
                teacher: '',
                reviews: []
            };
        },

        modificarCurso(__:void, { curso }):any{
            const elementoExiste = _.findIndex(database.cursos, function(o:any) {
                return o.id === curso.id
            });
            if(elementoExiste != -1){
                const valoraciones = database.cursos[elementoExiste].reviews;
                curso.reviews = valoraciones;
                database.cursos[elementoExiste] = curso;
                return curso;
            }
            return {
                id: "-1",
                title: `El curso no existe en la base de datos`,
                description: '',
                clases: -1,
                time: 0.0,
                level: 'ALL',
                logo: '',
                path: '',
                teacher: '',
                reviews: []
            }
        },

        eliminarCurso(__:void, {id}):any{
            const borrarCurso = _.remove(database.cursos, function(curso){
                return curso.id == id;
            });
            if (borrarCurso[0] === undefined){
                return {
                    id: "-1",
                    title: `El curso no se puede borrar por que no existe ningun curso con ese id`,
                    description: '',
                    clases: -1,
                    time: 0.0,
                    level: 'ALL',
                    logo: '',
                    path: '',
                    teacher: '',
                    reviews: []
                }
            }
            return borrarCurso[0];
        }
    }

}

export default mutation;    