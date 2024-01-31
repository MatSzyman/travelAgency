package wat.wcy.TravelAgency.DTO;

import lombok.Value;

@Value
public class PaymentDTO {

    Double price;
    String currency;
    String intent;
    String method;
    Integer reservationId;
}
