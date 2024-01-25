package wat.wcy.TravelAgency.Controller;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
import wat.wcy.TravelAgency.DTO.PaymentDTO;
import wat.wcy.TravelAgency.Logic.PayPalService;

@RestController
public class PayPalController {

    private final PayPalService service;

    public PayPalController(PayPalService service) {
        this.service = service;
    }

    @PostMapping(value = "/pay")
    public ResponseEntity<?> payment(@RequestBody PaymentDTO paymentDTO) {
        try {
            Payment payment = service.createPayment(paymentDTO.getPrice(),paymentDTO.getCurrency(),paymentDTO.getMethod()
                    , paymentDTO.getIntent(),"http://localhost:3000/cancel","http://localhost:3000/success");


            for(Links link:payment.getLinks()) {
                if(link.getRel().equals("approval_url")) {
                    return ResponseEntity.ok(new RedirectView(link.getHref()));
                }
            }

        } catch (PayPalRESTException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing PayPal payment");
        }
        return ResponseEntity.badRequest().body("Unable to create PayPal payment");
    }

    @PostMapping(value = "/cancel")
    public ResponseEntity<?> cancelPay() {
        return ResponseEntity.ok("Payment canceled");
    }

    @GetMapping("/success")
    public ResponseEntity<?> successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) {
        try {
            Payment payment = service.executePayment(paymentId, payerId);
            if ("approved".equals(payment.getState())) {
                return ResponseEntity.ok("Payment successful");
            }
        } catch (PayPalRESTException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error executing PayPal payment");
        }
        return ResponseEntity.badRequest().body("Payment not successful");
    }


}
