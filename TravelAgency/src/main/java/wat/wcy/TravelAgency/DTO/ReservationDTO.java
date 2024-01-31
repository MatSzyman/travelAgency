package wat.wcy.TravelAgency.DTO;

import lombok.Value;
import wat.wcy.TravelAgency.model.Reservation;

@Value
public class ReservationDTO {

    Integer id;
    String reservationNumber;
    Boolean isCanceled;
    Boolean isAllFood;

    public ReservationDTO(Reservation source) {
        this.id = source.getId();
        this.reservationNumber = source.getReservationNumber();
        this.isAllFood = source.getIsAllFood();
        this.isCanceled = source.getIsCanceled();
    }
}
