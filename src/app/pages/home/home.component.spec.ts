import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { Book } from "src/app/models/book.model";
import { BookService } from "../../services/book.service";
import { HomeComponent } from "./home.component"


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

//? MOCK DE UN SERVICIO 
const bookServiceMock = {
    getBooks: () => of(listBook)
};

//? MOCK DE UN PIPE: HACER ESTO CADA VEZ QUE NUESTRO COMPONENTE TENGA UN PIPE Y PONERLO EN LAS DECLARACIONES
@Pipe({name: 'reduceText'})
class ReducePipeMock implements PipeTransform {
    transform(): string {
        return '';
    }
}



describe('Home Component', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                HomeComponent,
                ReducePipeMock
            ],
            providers: [
               // BookService
               //? MOCK DE UN SERVICIO LINEA 34
               {
                   provide: BookService,
                   useValue: bookServiceMock
               }
            ],
            schemas:[
                CUSTOM_ELEMENTS_SCHEMA, 
                NO_ERRORS_SCHEMA
            ]

        }).compileComponents(); //? SIEMPRE DEBE IR ESTA FUNCION
    });

    beforeEach(() =>{
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


beforeAll(() =>{
    //? ESTO LO QUE HACE ES QUE EL CODIGO QUE PONGAMOS AQUI DENTRO SE VA A LLAMAR AL PRINCIPIO DE TODO Y NINGUNA VEZ MAS
});


afterEach(() =>{
    //? ESTO ES UNA FUNCION QUE VA A SALTAR DESPUES DE CADA TEST
});

afterAll(() => {
    //? ESTA FUNCION SALTARA DESPUES DE QUE HALLAN TERMINADO TODOS TEST
});



    it('should create', () =>{
        expect(component).toBeTruthy()
    });


    //? TEST A METODO QUE TIENE UN SUSCRIBRE
    it('getBook get books from the subscription', () => {
        const bookService = fixture.debugElement.injector.get(BookService);
        //const spy1 = jest.spyOn(bookService, 'getBooks').mockReturnValueOnce(of(listBook)); ya no es necesario este espia pues mockeamos el servicio antes
        component.getBooks();
        //expect(spy1).toHaveBeenCalledTimes(1);
        expect(component.listBook.length).toBe(3);
        expect(component.listBook).toEqual(listBook)
    })

});
