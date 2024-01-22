package wat.wcy.TravelAgency.DTO;

import lombok.Value;
import wat.wcy.TravelAgency.model.Reservation;

@Value
public class ReservationDTO {

    Integer id;
//    ClientDTO client;
//    TravelOptionDTO travelOption;
//    Insurance insurance;
    String reservationNumber;
    Boolean isCanceled;
    Boolean isAllFood;

    public ReservationDTO(Reservation source) {
        this.id = source.getId();
//        this.client = source.getClient().;
//        this.travelOption = source.getTravelOption().s;
//        this.insurance = source.getInsurance();
        this.reservationNumber = source.getReservationNumber();
        this.isAllFood = source.getIsAllFood();
        this.isCanceled = source.getIsCanceled();
    }
}
