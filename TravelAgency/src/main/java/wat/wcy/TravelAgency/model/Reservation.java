package wat.wcy.TravelAgency.model;

import jakarta.persistence.*;

@Entity
@Table(name = "reservation")
public class Reservation {
    @EmbeddedId
    private ReservationId id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "insurance_id")
    private Insurance insurance;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @MapsId("travelOptionId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "travel_option_id", nullable = false)
    private TravelOption travelOption;

    @Column(name = "reservation_number", nullable = false, length = 100)
    private String reservationNumber;

    @Column(name = "isCanceled", nullable = false)
    private Boolean isCanceled = false;

    @Column(name = "isAllFood", nullable = false)
    private Boolean isAllFood = false;

    public Boolean getIsAllFood() {
        return isAllFood;
    }

    public void setIsAllFood(Boolean isAllFood) {
        this.isAllFood = isAllFood;
    }

    public Boolean getIsCanceled() {
        return isCanceled;
    }

    public void setIsCanceled(Boolean isCanceled) {
        this.isCanceled = isCanceled;
    }

    public String getReservationNumber() {
        return reservationNumber;
    }

    public void setReservationNumber(String reservationNumber) {
        this.reservationNumber = reservationNumber;
    }

    public TravelOption getTravelOption() {
        return travelOption;
    }

    public void setTravelOption(TravelOption travelOption) {
        this.travelOption = travelOption;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Insurance getInsurance() {
        return insurance;
    }

    public void setInsurance(Insurance insurance) {
        this.insurance = insurance;
    }

    public ReservationId getId() {
        return id;
    }

    public void setId(ReservationId id) {
        this.id = id;
    }

}