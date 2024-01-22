package wat.wcy.TravelAgency.DTO;

import lombok.Value;

@Value
public class PaymentDTO {

    Integer travelOption;
    String currency;
    String intent;
    String method;

}
