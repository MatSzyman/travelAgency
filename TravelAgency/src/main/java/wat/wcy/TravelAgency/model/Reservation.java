package wat.wcy.TravelAgency.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import java.util.Objects;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "reservation")
public class Reservation {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "insurance_id")
    @ToString.Exclude

    private Insurance insurance;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    @ToString.Exclude
    private Client client;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "travel_option_id", nullable = false)
    @ToString.Exclude
    private TravelOption travelOption;

    @Column(name = "reservation_number", nullable = false, length = 100)
    private String reservationNumber;

    @Column(name = "is_canceled",nullable = false)
    private Boolean isCanceled = false;

    @Column(name = "is_all_food", nullable = false)
    private Boolean isAllFood = false;

    private Double reservationPrice;

    public Reservation(Client client,TravelOption travelOption, Insurance insurance,String reservationNumber,boolean isCanceled, boolean isAllFood, Double reservationPrice) {
        this.client = client;
        this.travelOption = travelOption;
        this.insurance = insurance;
        this.reservationNumber = reservationNumber;
        this.isCanceled = isCanceled;
        this.isAllFood = isAllFood;
        this.reservationPrice = reservationPrice;
    }

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