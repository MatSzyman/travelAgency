package wat.wcy.TravelAgency.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import wat.wcy.TravelAgency.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation,Integer> {
    @Query(value = "SELECT COUNT(r.id) FROM reservation r" +
            " INNER JOIN travel_option trO ON r.travel_option_id = trO.id" +
            " INNER JOIN travel tr ON trO.travel_id = tr.id" +
            " WHERE tr.id = :travelId AND r.is_canceled = 0", nativeQuery = true)
    Integer getCountOnGoingReservationsByTravelId(
            @Param("travelId") Integer travelId);
}
