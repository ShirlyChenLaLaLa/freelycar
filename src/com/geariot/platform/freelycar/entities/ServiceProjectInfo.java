package com.geariot.platform.freelycar.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class ServiceProjectInfo {
	private int id;
	private Project project;
	private int times;
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public int getId() {
		return id;
	}
	@ManyToOne
	@JoinColumn(name="projectId")
	public Project getProject() {
		return project;
	}
	public int getTimes() {
		return times;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setProject(Project project) {
		this.project = project;
	}
	public void setTimes(int times) {
		this.times = times;
	}
}
