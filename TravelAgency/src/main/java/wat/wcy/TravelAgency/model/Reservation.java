package wat.wcy.TravelAgency.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.util.Objects;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "reservation")
public class Reservation {


    @EmbeddedId
    private ReservationId id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "insurance_id")
    @ToString.Exclude
    private Insurance insurance;

    @MapsId("clientId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    @ToString.Exclude
    private Client client;

    @MapsId("travelOptionId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "travel_option_id", nullable = false)
    @ToString.Exclude
    private TravelOption travelOption;

    @Column(name = "reservation_number", nullable = false, length = 100)
    private String reservationNumber;

    @Column(name = "isCanceled", nullable = false)
    private Boolean isCanceled = false;

    @Column(name = "isAllFood", nullable = false)
    private Boolean isAllFood = false;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Reservation that = (Reservation) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}