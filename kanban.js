var kanban = new KanbanGrid({
    columns: [
        {
            id: 1,
            name: "Первичный контакт"
        },
        {
            id: 2,
            name: "Переговоры по сделке"
        },
        {
            id: 3,
            name: "Договор"
        },
        {
            id: 4,
            name: "Оплата"
        },
        {
            id: 5,
            name: "Завершение сделки"
        }
    ],
    items: [
        {
            id: 1,
            name: "Продажа оборудования для производства корма",
            link: "/link",
            columnId: 2,
            price: 750000,
            date: "13.05.2016",
            autorName: "Pavel Rafeev",
            autorLink: "/user/rafeev",
            phone: "+79993447474",
            mail: "info@bitrix.ru"
        },
        {
            id: 2,
            name: "Постирать носки с мегакрутым отбеливателем",
            link: "/link",
            columnId: 2,
            price: 750000,
            date: "13.05.2016",
            autorName: "Pavel Rafeev",
            autorLink: "/user/rafeev",
            phone: "+79993447474",
            mail: "info@bitrix.ru"
        },
        {
            id: 3,
            name: "Покормить пса новым кормом",
            link: "/link",
            columnId: 1,
            price: 750000,
            date: "13.05.2016",
            autorName: "Pavel Rafeev",
            autorLink: "/user/rafeev",
            phone: "+79993447474",
            mail: "info@bitrix.ru"
        },
        {
            id: 4,
            name: "Пменить наполнитель в лотке у кота",
            link: "/link",
            columnId: 1,
            price: 750000,
            date: "13.05.2016",
            autorName: "Pavel Rafeev",
            autorLink: "/user/rafeev",
            phone: "+79993447474",
            mail: "info@bitrix.ru"
        },
        {
            id: 5,
            name: "Поменять резину",
            link: "/link",
            columnId: 1,
            price: 750000,
            date: "13.05.2016",
            autorName: "Pavel Rafeev",
            autorLink: "/user/rafeev",
            phone: "+79993447474",
            mail: "info@bitrix.ru"
        },
        {
            id: 6,
            name: "Позвонить маме",
            link: "/link",
            columnId: 3,
            price: 750000,
            date: "13.05.2016",
            autorName: "Pavel Rafeev",
            autorLink: "/user/rafeev",
            phone: "+79993447474",
            mail: "info@bitrix.ru"
        },
        {
            id: 7,
            name: "Забрать вещи из химчистки",
            link: "/link",
            columnId: 3,
            price: 750000,
            date: "13.05.2016",
            autorName: "Pavel Rafeev",
            autorLink: "/user/rafeev",
            phone: "+79993447474",
            mail: "info@bitrix.ru"
        },
        {
            id: 8,
            name: "Устроить денежный дождь в стрипклубе",
            link: "/link",
            columnId: 3,
            price: 750000,
            date: "13.05.2016",
            autorName: "Pavel Rafeev",
            autorLink: "/user/rafeev",
            phone: "+79993447474",
            mail: "info@bitrix.ru"
        },
        {
            id: 9,
            name: "Написать письмо в будущее самому себе. Вскрыть через 10 лет.",
            link: "/link",
            columnId: 3,
            price: 750000,
            date: "13.05.2016",
            autorName: "Pavel Rafeev",
            autorLink: "/user/rafeev",
            phone: "+79993447474",
            mail: "info@bitrix.ru"
        },
        {
            id: 10,
            name: "Организовать кинотеатр под открытым небом и приглашать всех вокруг на бесплатный просмотр.",
            link: "/link",
            columnId: 4,
            price: 750000,
            date: "13.05.2016",
            autorName: "Pavel Rafeev",
            autorLink: "/user/rafeev",
            phone: "+79993447474",
            mail: "info@bitrix.ru"
        },
        {
            id: 11,
            name: "Купить ведро винограда на рынке и высыпав в ванную начать топтать его босыми ногами делая вино. Только бы участковый не заподозрил тебя в сомнительных делах.",
            link: "/link",
            columnId: 5,
            price: 750000,
            date: "13.05.2016",
            autorName: "Pavel Rafeev",
            autorLink: "/user/rafeev",
            phone: "+79993447474",
            mail: "info@bitrix.ru"
        }
    ],
    events: {
        onTitleChange: function (column) { },
        onItemChange: function (item) { }
    },

    container: document.getElementById("kanban")
});
KanbanGrid
- column = { id: new KanbanColumn }
- items = { id: new KanbanItem }
*addItem
*addColumn
* moveItem
* draw

KanbanColumn
- items: []
render
addItem

KanbanItem