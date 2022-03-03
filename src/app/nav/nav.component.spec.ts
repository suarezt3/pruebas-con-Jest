import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import { NavComponent } from "./nav.component";


//? SE CREA ESTE COMPONENTE FALSO PARA NO TENER QUE LLAMAR LOS COMPONENTES REALES DE LAS RUTAS
class componentTestRoute {}


describe('Nav Component', () => {
    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                //? SE IMPORTA ESTE MODULO Y NO EL ROUTER EN LOS PROVIDER Y SE DEBE ESPECIFICAR LAS RUTAS QUE VA A CONTENER
                RouterTestingModule.withRoutes([
                    {path: 'home', component: componentTestRoute},
                    {path: 'cart', component: componentTestRoute}
                ]) 
            ],
            declarations: [
                NavComponent
            ],
            providers: [

            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents()
    });


    beforeEach(() => {
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(component).toBeTruthy()
    });

    it('Should navigate', () => {
        const router = TestBed.inject(Router);
        const spy = jest.spyOn(router, 'navigate');
        component.navTo('home');
        expect(spy).toHaveBeenCalledWith(['/home']);

        component.navTo('cart');
        expect(spy).toHaveBeenCalledWith(['/cart']);
    });


    

});