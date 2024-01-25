package wat.wcy.TravelAgency.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import java.util.Objects;
import java.util.Set;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "insurance")
public class Insurance {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "description", nullable = false, length = 100)
    private String description;

    @OneToMany(mappedBy = "insurance")
    @ToString.Exclude
    private Set<Reservation> reservations;



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Insurance insurance = (Insurance) o;
        return id != null && Objects.equals(id, insurance.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}