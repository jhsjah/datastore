import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const CardForm3 = () => {
  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentCardId, setCurrentCardId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/slider3`);
      setCards(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
      setMessage("Error fetching cards");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link);
    if (image) {
      formData.append("image", image);
    }

    try {
      let response;
      if (isEditing) {
        response = await axios.put(`${API_BASE_URL}/slider3/update/${currentCardId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setCards(cards.map((card) => (card._id === currentCardId ? response.data : card)));
        setMessage("Card updated successfully!");
      } else {
        response = await axios.post(`${API_BASE_URL}/slider3/add`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setCards([...cards, response.data]);
        setMessage("Card added successfully!");
      }
      resetForm();
    } catch (error) {
      console.error(`Error ${isEditing ? "updating" : "adding"} card:`, error);
      setMessage(`Error ${isEditing ? "updating" : "adding"} card`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (card) => {
    setTitle(card.title);
    setDescription(card.description);
    setLink(card.link);
    setIsEditing(true);
    setCurrentCardId(card._id);
    setPreview(`${API_BASE_URL}/uploads/${card.image}`);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/slider3/delete/${id}`);
      setCards(cards.filter((card) => card._id !== id));
      setMessage("Card deleted successfully");
    } catch (error) {
      console.error("Error deleting card:", error);
      setMessage("Error deleting card");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLink("");
    setImage(null);
    setPreview(null);
    setIsEditing(false);
    setCurrentCardId(null);
  };

  return (
    <div>
      <h1>{isEditing ? "Edit Card" : "Add a New Card"}</h1>
      {message && <p>{message}</p>}
      {loading && <p>Loading...</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Link:</label>
          <input type="url" value={link} onChange={(e) => setLink(e.target.value)} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} required={!isEditing} />
          {preview && <img src={preview} alt="Preview" width="100" />}
        </div>
        <button type="submit" disabled={loading}>{isEditing ? "Update Card" : "Add Card"}</button>
      </form>

      <h2>Cards List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Link</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <tr key={card._id}>
              <td>{card.title}</td>
              <td>{card.description}</td>
              <td>
                <a href={card.link} target="_blank" rel="noopener noreferrer">
                  {card.link}
                </a>
              </td>
              <td>
                <img src={`${API_BASE_URL}/uploads/${card.image}`} alt={card.title} width="100" />
              </td>
              <td>
                <button onClick={() => handleEdit(card)} disabled={loading}>
                  Edit
                </button>
                <button onClick={() => handleDelete(card._id)} disabled={loading}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CardForm3;

