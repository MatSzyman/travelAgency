package wat.wcy.TravelAgency.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import wat.wcy.TravelAgency.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation,Integer> {


}
