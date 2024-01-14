package wat.wcy.TravelAgency.DTO;

import wat.wcy.TravelAgency.model.TravelOption;

import java.time.Instant;


public class TravelOptionDTO {

   Instant departureTime;
   Instant arrivalTime;
   Double travelPrice;

    public TravelOptionDTO(TravelOption source) {
        this.departureTime = source.getDepartureTime();
        this.arrivalTime = source.getArrivalTime();
        this.travelPrice = source.getTravelPrice();
    }

}
