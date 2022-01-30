import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing"
import { AppRoutingModule } from "src/app/app-routing.module";
import { PageModule } from "src/app/pages/pages.module";
import { ComponentModule } from "../component.module"
import { PaymentCardComponent } from "./payment-card.component"

describe('PaymentCardComponent', () => {
    let component: PaymentCardComponent,
        fixture: ComponentFixture<PaymentCardComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ComponentModule, PageModule, AppRoutingModule]
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(PaymentCardComponent);
                component = fixture.componentInstance;
            })
    }));

    it('can create component', () => {
        expect(component).toBeTruthy();
    });

    it('should display the card info', () => {
        
    });
})