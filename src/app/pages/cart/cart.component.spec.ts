import { ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { CartComponent } from "./cart.component"
import { HttpClientTestingModule} from '@angular/common/http/testing'
import { BookService } from "../../services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "src/app/models/book.model";


const listBook: Book[] = [
    {
        name: '',
        author: '',
        isbn: '',
        price: 15,
        amount: 2,
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 20,
        amount: 1,
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 5,
        amount: 7,
    }
]


describe('Cart component', () => {

    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
    let service: BookService;

    //? ESTE METODO SE VA A EJECUTAR ANTES DE CADA TEST
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports:[
                HttpClientTestingModule
            ],
            declarations: [
                CartComponent
            ],
            providers: [
                BookService
            ],
            schemas: [ //? Siempre añadir los esquemas
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents(); //?Es importante agregar esto para que se puedan compilar correctamente
    });

    beforeEach(() =>{
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = fixture.debugElement.injector.get(BookService);
        jest.spyOn(service, 'getBooksFromCart').mockImplementation(() => listBook)
    });


    //? ESTE METODO SE VA A EJECUTAR DESPUES DE CADA TEST
    afterEach( () => {
        fixture.destroy();
        jest.resetAllMocks()
    })

    it('should create', () =>{
        expect(component).toBeTruthy();
    });

    //? ALTERNATVAS PARA INSTANCIAR UN COMPONENTE O SERVCIO
    //? HACIENDOLO DE ESTA MANERA ES NECESARIO PONER EL COMPONENTE EN LOS PROVIDER TAMBIEN EN LA CONFIGURACION
    // it('Should create', inject([CartComponent], (component: CartComponent) => {
    //     expect(component).toBeTruthy() HACIENDOLO DE ESTA MANERA ES NECESARIO PONER EL COMPONENTE EN LOS PROVIDER TAMBIEN
    // }))


    it('getTotalPrice returs and amount', () => {
        const totalPrice = component.getTotalPrice(listBook)
        expect(totalPrice).toBeGreaterThan(0);
        expect(totalPrice).not.toBe(0);
        expect(totalPrice).not.toBeNull()
    });


    it('onInputNumberChanges increments correctly', () =>{
        const action = 'plus';
        const book: Book = {
                name: '',
                author: '',
                isbn: '',
                price: 15,
                amount: 2,
        };

        //? 2 Formas de acceder a un servicio privado (no recomendadas)
        //const service1 = (component as any)._bookService;
        //const service2 = component['_bookService'];
        //? Forma recomendada
        //const service = fixture.debugElement.injector.get(BookService);

        //?Los espias deben declararse antes de ser invocados, son para llamar hacer test a metodos
        const spy1 = jest.spyOn(service, 'updateAmountBook').mockImplementation(() => null);
        const spy2 = jest.spyOn(component, 'getTotalPrice').mockImplementation(() => null);
        expect(book.amount).toBe(2)

        component.onInputNumberChange(action, book);
        expect(book.amount).toBe(3)

        expect(spy1).toHaveBeenCalledTimes(1)
        expect(spy2).toHaveBeenCalledTimes(1)
        
    });

    it('onInputNumberChanges decrements correctly', () =>{
        const action = 'minus';
        const book: Book = {
                name: '',
                author: '',
                isbn: '',
                price: 15,
                amount: 2,
        };

        //? 2 Formas de acceder a un servicio privado (no recomendadas)
        //const service1 = (component as any)._bookService;
        //const service2 = component['_bookService'];
        //? Forma recomendada
        //const service = fixture.debugElement.injector.get(BookService);

        //?Los espias deben declararse antes de ser invocados
        const spy1 = jest.spyOn(service, 'updateAmountBook').mockImplementation(() => null);
        const spy2 = jest.spyOn(component, 'getTotalPrice').mockImplementation(() => null);
        expect(book.amount).toBe(2)
        component.onInputNumberChange(action, book);
        expect(book.amount).toBe(1)
        expect(spy1).toHaveBeenCalledTimes(1)
        expect(spy2).toHaveBeenCalledTimes(1)
        
    });

    //? TEST A METODOS PRIVADOS
    it('onClearBooks works corretly', () =>{
        const spy1 = jest.spyOn(service, 'removeBooksFromCart').mockImplementation(() => null);
        const spy2 = jest.spyOn(component as any, '_clearListCartBook');
        component.listCartBook = listBook;
        component.onClearBooks();
        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalledTimes(1);
        expect(spy2).toHaveBeenCalledTimes(1);
    });

    it('_clearListCartBook works corretly', () => {
        const spy1 = jest.spyOn(service, 'removeBooksFromCart').mockImplementation(() => null);
        component.listCartBook = listBook;
        component["_clearListCartBook"]();
        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalledTimes(1)
    })
})