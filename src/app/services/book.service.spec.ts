import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import Swal from "sweetalert2";
import { environment } from "../../environments/environment";
import { Book } from "../models/book.model";
import { BookService } from "./book.service"


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
];



//? TEST A UN SERVCIO CON PETICIONES A UNA API
describe('Bookservice', () => {
    let service: BookService;
    let httpMock: HttpTestingController; //? SE DEBE VERIFICAR QUE SEA TESTING


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ], 
            providers: [
                BookService
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        });
    });

    beforeEach(() => {
        service = TestBed.inject(BookService);
        httpMock = TestBed.inject(HttpTestingController)
    });

    afterEach(() => {
        jest.resetAllMocks(); //? ESTO HACE QUE SE RESETEE ENTRE UN TEST Y OTRO
        localStorage.clear();
    })

    afterAll(() =>{
        httpMock.verify(); //? ESTO VERIFICA QUE NO ALLA PETICIONES PENDIENTES ENTRE CADA TEST, PARA QUE NO SE LANCE EL SIGUIENTE TEST SI HAY ALGO PENDIENTE
    });

    it('Should create', () => {
        expect(service).toBeTruthy();
    });

  
    it('getBooks return a list of book does a get method', () =>{
        service.getBooks().subscribe((resp: Book[]) =>{
            expect(resp).toEqual(listBook);
        });

        const req = httpMock.expectOne(environment.API_REST_URL + `/book`)
        expect(req.request.method).toBe('GET')
        req.flush(listBook)
    });

    
    it('getBooksFromCart return an empty array when localStorage is empty', () => {
        const listBook = service.getBooksFromCart()
        expect(listBook.length).toBe(0);
    });


    it('geBookstFromCart return an array of book when it exist in the localStorage', () =>{
        localStorage.setItem('listCartBook', JSON.stringify(listBook));
        const newlistBook = service.getBooksFromCart()
        expect(newlistBook .length).toBe(3);
    });


    it('addBookToCart add book successfully when the list does not exist in the localStorage',() =>{
        const book: Book = {
            name: '',
            author: '',
            isbn: '',
            price: 15,
        };
        const toastMock = {
            fire: ()  => null
        } as any;
        const spy1 = jest.spyOn(Swal, 'mixin').mockImplementation(() => {
            return toastMock;
        });
        let newlistBook = service.getBooksFromCart()
        expect(newlistBook.length).toBe(0)
        service.addBookToCart(book);
        newlistBook = service.getBooksFromCart()

        expect(spy1).toHaveBeenCalledTimes(1);
        expect(newlistBook.length).toBe(1)
    });

    // public removeBooksFromCart(): void {
    //     localStorage.setItem('listCartBook', null);
    //   }

    it('removeBooksFromCart remove the list from the localStorage', () => {
        
        const toastMock = {
            fire: ()  => null
        } as any;
       jest.spyOn(Swal, 'mixin').mockImplementation(() => {
            return toastMock;
        });

        const book: Book = {
            name: '',
            author: '',
            isbn: '',
            price: 15,
        };
        service.addBookToCart(book);
        let newlistBook = service.getBooksFromCart();
        expect(newlistBook.length).toBe(1);
        service.removeBooksFromCart();
        newlistBook = service.getBooksFromCart()
        expect(newlistBook.length).toBe(0)
    })

});