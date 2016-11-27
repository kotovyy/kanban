"use strict";

/*KanbanGrid
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

KanbanItem*/

class KanbanGrid {
    constructor(options) {
        this.container = options.container;
        this.layout = {

        };

		this.columns = { /* id => KanbanColumn*/ };
		this.items = { /* id => KanbanItem*/ }

        this.loadData(options);

        this.init();
    };


    loadData(json) {
    	options
    	//addColumn
    	//addItemm
    	if (options && Array.isArray(options.columns))
    	{
    		options.columns.forEach(function(column) {
    			this.addColumn(column);
    		}, this);
    	}
    }

    init() {

    }

    draw: function() {
    	//цикл по колонкам
    	//вызов render
    	this.columns
    }

    moveItem(sourceItem, column, targetItem = null) {

    }


    addColumn(options) {

    	let column = new KanbanColumn();
    	this.columns[column.getId()] = column;
    };

    getColumn(id) {
    	return this.columns[id] ? this.columns[id] : null;
    }

    removeColumn() {

    }

    addItem(options) {

    	var column = this.getColumn(item.columnId);
    	if (!column)
    	{
    		return null;
    	}

    	let item = new KanbanItem();
    	this.items[item.getId()] = item;
    	column.addItem(item);
    }

    removeItem(item) {
    	//удалить из delete this.items[item.getId()]
    	//item.getColumn().removeItem(item);
    }
}

//класс KanbanColumn

class KanbanColumn {
    constructor(options, container) {
        this.id = options.id;
        this.name = options.name;
        this.container = container;
        this.items = [];
    };

    getId() {
    	return this.id;
    }

    addItem(item) {
    	if (item instanceof KanbanItem)
    	{
    		this.items.push(item);
    	}
    }

    //удаление item
	removeItem (item) {
		this.items = this.items.filter((currentItem, index) => {
			return currentItem !== item.index;
		});
	}


    render() {

    	let result = `<div class="column-container">`;
    	this.items.forEach(function(item) {
    		result += item.render();
    	}, this);

    	result += `</div>`;

    	return result;
    }

}

//класс KanbanItem

class KanbanItem {
    constructor(options) {
        this.id = options.id;
        this.name = options.name;
        this.columnId = options.columnId;
        this.price = options.price;
        this.autorName = options.autorName;
        this.date = options.date;

        this.layout = {
        	container: null,
        	input: null,
        	button: null
        };
        console.log("все создалось");
    }

    render() {

    	if (this.layout.container)
    	{
    		return this.layout.container;
    	}

    	this.layout.container = document.createElement("div");
    	this.layout.container.className = "";
    	this.layout.input = document.createElement("input");
    	this.layout.container.appendChild(this.layout.input);


    	return `<div class="kanban-column-title">' + column.name + '</div><div class="kanban-column-price"></div></div>`;
    }
}


var kanban2 = new KanbanGrid();

kanban2.addColumn({});
kanban2.addItem({});

//Создание
var kanban = new KanbanGrid({
	events: {
		onTitleChanged: function(column) {
			//ajax
		},

		onItemChanged: function(item) {
			//ajax
		}
	},
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
    container: document.getElementById("kanban")
});

kanban.draw();