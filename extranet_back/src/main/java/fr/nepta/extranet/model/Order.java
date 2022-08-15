package fr.nepta.extranet.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "`order`")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	@TableGenerator(name = "orderGen")//, pkColumnValue = "order_id"
//  @GeneratedValue(strategy = GenerationType.TABLE, generator = "orderGen")
	@Column(name = "`order_id`")
	private String orderId;

	@Column(name = "`order_date`", nullable = false)
	@DateTimeFormat(pattern = "dd-MM-yyyy HH:mm")
	private Date orderDate;

}
