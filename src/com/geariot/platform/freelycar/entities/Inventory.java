package com.geariot.platform.freelycar.entities;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class Inventory {
	private String id;
	private String name;
	private InventoryType type;
	private InventoryBrand brand;
	private String standard;
	private String property;
	private float price;
	private float amount;
	private Set<Provider> providers;
	private String comment;
	private Date createDate;
	public float getAmount() {
		return amount;
	}
	@ManyToOne
	@JoinColumn(name="brandId", foreignKey=@ForeignKey(name="none"))
	public InventoryBrand getBrand() {
		return brand;
	}
	public String getComment() {
		return comment;
	}
	public Date getCreateDate() {
		return createDate;
	}
	@Id
	@GenericGenerator(name="IdGen", strategy="com.geariot.platform.freelycar.utils.IDGenerator")
	@GeneratedValue(generator="IdGen")
	public String getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public float getPrice() {
		return price;
	}
	public String getProperty() {
		return property;
	}
	@ManyToMany
	@JoinTable(name="inventory_provider", 
				joinColumns={@JoinColumn(name="inventoryId", foreignKey=@ForeignKey(name="none"))}, 
				inverseJoinColumns={@JoinColumn(name="providerId", foreignKey=@ForeignKey(name="none"))})
	public Set<Provider> getProviders() {
		return providers;
	}
	public String getStandard() {
		return standard;
	}
	@ManyToOne
	@JoinColumn(name="typeId", foreignKey=@ForeignKey(name="none"))
	public InventoryType getType() {
		return type;
	}
	public void setAmount(float amount) {
		this.amount = amount;
	}
	public void setBrand(InventoryBrand brand) {
		this.brand = brand;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public void setId(String id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public void setProperty(String property) {
		this.property = property;
	}
	public void setProviders(Set<Provider> providers) {
		this.providers = providers;
	}
	public void setStandard(String standard) {
		this.standard = standard;
	}
	public void setType(InventoryType type) {
		this.type = type;
	}
}
