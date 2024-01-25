package wat.wcy.TravelAgency.Logic;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.InvalidDataAccessResourceUsageException;
import org.springframework.stereotype.Service;
import wat.wcy.TravelAgency.Repositories.ReservationRepository;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public Integer getCountOnGoingReservationsByTravelId(Integer travelId){
        try {
            return reservationRepository.getCountOnGoingReservationsByTravelId(travelId);
        } catch (Exception e){
            throw new InvalidDataAccessResourceUsageException("wrong query");
        }

    }
}
