package wat.wcy.TravelAgency.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;


@Data
@Embeddable
public class ReservationId implements Serializable {
    private static final long serialVersionUID = 9161241122655127448L;
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "user_id", nullable = false)
    private Integer userId;
    @Column(name = "travel_option_id", nullable = false)
    private Integer travelOptionId;


    @Override
    public int hashCode() {
        return Objects.hash(travelOptionId, id, userId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ReservationId entity = (ReservationId) o;
        return Objects.equals(this.travelOptionId, entity.travelOptionId) &&
                Objects.equals(this.id, entity.id) &&
                Objects.equals(this.userId, entity.userId);
    }
}