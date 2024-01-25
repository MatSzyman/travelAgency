package wat.wcy.TravelAgency.DTO;

import lombok.Value;

@Value
public class CreateReservationDTO {

    String client;
    Integer travelOption;
    Integer insurance;
    String reservationNumber;
    Boolean isCanceled = false;
    Boolean isAllFood = false;


}

