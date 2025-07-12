import { useState } from 'react';
import { TextField } from '../TextField';

type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formData, setFormData] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [formKey, setFormKey] = useState(0);

  const handleChange = (field: keyof Movie, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isValid = ['title', 'imgUrl', 'imdbUrl', 'imdbId'].every(key =>
    formData[key as keyof Movie].trim(),
  );

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!isValid) {
      return;
    }

    onAdd(formData);
    setFormData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setFormKey(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={formKey} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={value => handleChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={value => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={value => handleChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={value => handleChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={value => handleChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
