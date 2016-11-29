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
        	container: null      	
        };

		this.columns = options.columns || { /* id => KanbanColumn*/ };
		this.items = options.items || { /* id => KanbanItem*/ };
        this.loadData(options);

    };


    loadData(options) {     

    	if (options && Array.isArray(options.columns))
    	{
    		this.columns.forEach(function(column) {
    			this.addColumn(column);
    		}, this);
    	}
	
    	if (options && Array.isArray(options.items))
    	{
    		this.items.forEach(function(item) {
    			this.addItem(item);
    		}, this);
    	}

	}

	draw() {
		this.columns.forEach(function(column) {
			column = new KanbanColumn(column, this.container);
			column.render(this.items);

		}, this);
	}

    moveItem(sourceItem, column, targetItem = null) {

    }

    addColumn(column) {
    	column = new KanbanColumn(column, this.container);
    };

    getColumn(id) {
    	if(this.columns[id]){
    		return this.columns[id];
    	}
    	return null;
    }

    removeColumn() {

    }

    addItem(item) {

    	item = new KanbanItem(item);

    	var currentColumn = this.getColumn(item.columnId - 1);
    	if (!currentColumn)
    	{
    		return null;
    	}

		currentColumn = new KanbanColumn(currentColumn, this.container)
    	currentColumn.addItem(item);
    }

    removeItem(item) {
    	//удалить из delete this.items[item.getId()]
    	//item.getColumn().removeItem(item);
    }


}

//класс KanbanColumn

class KanbanColumn {
    constructor(column, container) {
        this.id = column.id;
        this.name = column.name;
        this.container = container;
        this.items = [];

        //var render = this.render();

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


    render(items) {
    	let result = `<div class="kanban-column"><div class="kanban-column-title"></div><div class="kanban-column-price"></div>`;
    	console.log("начало");

    	console.log(items);

    	items.forEach(function(item) {
    		console.log("в рендер заходим");
    		item = new KanbanItem(item);
    		var inner = item.render();
    		console.log(inner);
    		result += inner.outerHTML;
    	}, this);

    	result += `</div>`;
    	this.container.innerHTML += result;
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
        	container: null
        };

        //var render = this.render();
    }

    getId() {
    	return this.id;
    }

    render() {
    	if (this.layout.container)
    	{
    		return this.layout.container;
    	}

    	this.layout.container = document.createElement("div");
    	this.layout.container.className = "kanban-item";

    	this.layout.name = document.createElement("div");
    	this.layout.name.className = "kanban-item-name";
    	this.layout.name.textContent = this.name;
    	this.layout.container.appendChild(this.layout.name);

    	this.layout.price = document.createElement("div");
    	this.layout.price.className = "kanban-item-price";
    	this.layout.name.textContent = this.price;
    	this.layout.container.appendChild(this.layout.price);

    	this.layout.author = document.createElement("div");
    	this.layout.author.className = "kanban-item-author";
    	this.layout.container.appendChild(this.layout.author);

    	this.layout.authorLink = document.createElement("a");
    	this.layout.authorLink.className = "kanban-item-author-link";
    	this.layout.authorLink.textContent = this.autorName;
    	this.layout.author.appendChild(this.layout.authorLink);

    	this.layout.date = document.createElement("div");
    	this.layout.date.className = "kanban-item-date";
    	this.layout.date.textContent = this.date;
    	this.layout.container.appendChild(this.layout.date);	

    	return this.layout.container;

/*    	<div class="kanban-item">
	    	<div class="kanban-item-name">' + item.name + '</div>
	    	<div class="kanban-item-price">' + item.price + '</div>
	    	<div class="kanban-item-author">
	    		<a class="kanban-item-author-link" href="#">' + item.autorName + '</a>
	    	</div>
	    	<div class="kanban-item-date">+ item.date + '</div>
    	</div>';*/
    }
}

//Создание
var kanban = new KanbanGrid({
/*	events: {
		onTitleChanged: function(column) {
			//ajax
		},

		onItemChanged: function(item) {
			//ajax
		}
	},*/
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