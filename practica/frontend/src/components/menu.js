const menu = [
    {
        id:'1',
        text:"Comentarios",
        expanded: true,
        items:[
            {
                id: '1_1',
                text:"Gestión",
            },
            {
                id: '1_2',
                text:"Listado",
                selected: true,
            }
        ]
    },
    {
        id:'2',
        text:"Reportes",
        expanded: true,
        items:[
            {
                id: '2_1',
                text:"Eliminación de comentarios",
            }
        ]
    },
    {
        id:'3',
        text:"Usuarios",
    }
]

export default menu;