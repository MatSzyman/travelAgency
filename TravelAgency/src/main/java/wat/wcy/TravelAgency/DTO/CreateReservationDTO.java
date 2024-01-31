package wat.wcy.TravelAgency.DTO;

import lombok.Value;

@Value
public class CreateReservationDTO {

    String client;
    Integer travelOption;
    Integer insurance;
    Boolean isCanceled = false;
    Boolean isAllFood = false;
    Double reservationPrice;

}

