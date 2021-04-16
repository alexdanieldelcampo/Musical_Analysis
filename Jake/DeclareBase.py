import numpy as np
import pandas as pd
import datetime as dt

# Python SQL toolkit and Object Relational Mapper
import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect

from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Float

from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()


# In[3]:


# create engine to hawaii.sqlite
engine = create_engine("sqlite:///musicData.sqlite")
# engine = create_engine("sqlite:///Resources/hawaii.sqlite")
inspector=inspect(engine)
inspector.get_table_names()


# In[4]:


dataByYearColumns = inspector.get_columns('data_by_year')
for c in dataByYearColumns:
    print(c["name"],c["type"])


# In[5]:


class DataByYear(Base):
  __tablename__ = "data_by_year"
  year = Column(String, primary_key=True)
  acousticness = Column(Float)
  danceability = Column(Float)
  duration_ms = Column(Float)
  energy = Column(Float)
  instrumentalness = Column(Float)
  liveness = Column(Float)
  loudness = Column(Float)
  speechiness = Column(Float)
  tempo = Column(Float)
  valence = Column(Float)
  popularity = Column(Float)
  key = Column(Integer)
  mode = Column(Integer)


# In[6]:


dataColumns = inspector.get_columns('data')
for c in dataColumns:
    print(c["name"],c["type"])


# In[7]:


class Data(Base):
  __tablename__ = "data"
  acousticness = Column(Float)
  artists = Column(String)
  danceability = Column(Float)
  duration_ms = Column(Integer)
  energy = Column(Float)
  explicit = Column(Integer)
  id = Column(String, primary_key = True)
  instrumentalness = Column(Float)
  key = Column(Integer)
  liveness = Column(Float)
  loudness = Column(Float)
  mode = Column(Integer)
  name = Column(String)
  popularity = Column(Integer)
  release_date = Column(String)
  speechiness = Column(Float)
  tempo = Column(Float)
  valence = Column(Float)
  year = Column(Integer)


# In[8]:


dataByArtistColumns = inspector.get_columns('data_by_artist')
for c in dataByArtistColumns:
    print(c["name"],c["type"])


# In[9]:


class DataByArtist(Base):
  __tablename__ = "data_by_artist"
  artists = Column(String, primary_key = True)
  acousticness = Column(Float)
  danceability = Column(Float)
  duration_ms = Column(Float)
  energy = Column(Float)
  instrumentalness = Column(Float)
  liveness = Column(Float)
  loudness = Column(Float)
  speechiness = Column(Float)
  tempo = Column(Float)
  valence = Column(Float)
  popularity = Column(Float)
  key = Column(Integer)
  mode = Column(Integer)
  count = Column(Integer)
  


# In[10]:


dataByArtistOColumns = inspector.get_columns('data_by_artist_o')
for c in dataByArtistOColumns:
    print(c["name"],c["type"])


# In[11]:


class DataByArtistO(Base):
  __tablename__ = 'data_by_artist_o'
  mode = Column(Integer)
  count = Column(Integer)
  acousticness = Column(Float)
  artists = Column(String, primary_key = True)
  danceability = Column(Float)
  duration_ms = Column(Float)
  energy = Column(Float)
  instrumentalness = Column(Float)
  liveness = Column(Float)
  loudness = Column(Float)
  speechiness = Column(Float)
  tempo = Column(Float)
  valence = Column(Float)
  popularity = Column(Float)
  key = Column(Integer)


# In[12]:


dataByGenresColumns = inspector.get_columns('data_by_genres')
for c in dataByGenresColumns:
    print(c["name"], c["type"])


# In[13]:


class DataByGenres(Base):
  __tablename__ = 'data_by_genres'
  genres = Column(String, primary_key=True)
  acousticness = Column(Float)
  danceability = Column(Float)
  duration_ms = Column(Float)
  energy = Column(Float)
  instrumentalness = Column(Float)
  liveness = Column(Float)
  loudness = Column(Float)
  speechiness = Column(Float)
  tempo = Column(Float)
  valence = Column(Float)
  popularity = Column(Float)
  key = Column(Integer)
  mode = Column(Integer)


# In[14]:


dataByGenresOColumns = inspector.get_columns('data_by_genres_o')
for c in dataByGenresOColumns:
    print(c["name"], c["type"])


# In[15]:


class DataByGenresO(Base):
  __tablename__ = 'data_by_genres_o'
  mode = Column(Integer)
  genres = Column(String, primary_key = True)
  acousticness = Column(Float)
  danceability = Column(Float)
  duration_ms = Column(Float)
  energy = Column(Float)
  instrumentalness = Column(Float)
  liveness = Column(Float)
  loudness = Column(Float)
  speechiness = Column(Float)
  tempo = Column(Float)
  valence = Column(Float)
  popularity = Column(Float)
  key = Column(Integer)


# In[16]:


dataByYearOColumns = inspector.get_columns('data_by_year_o')
for c in dataByYearOColumns:
    print(c["name"],c["type"])


# In[17]:


class DataByYearO(Base):
  __tablename__ = 'data_by_year_o'
  mode = Column(Integer)
  year = Column(Integer, primary_key = True)
  acousticness = Column(Float)
  danceability = Column(Float)
  duration_ms = Column(Float)
  energy = Column(Float)
  instrumentalness = Column(Float)
  liveness = Column(Float)
  loudness = Column(Float)
  speechiness = Column(Float)
  tempo = Column(Float)
  valence = Column(Float)
  popularity = Column(Float)
  key = Column(Integer)


# In[18]:


dataOColumns = inspector.get_columns('data_o')
for c in dataOColumns:
    print(c["name"],c["type"])


# In[19]:


class DataO(Base):
  __tablename__ = 'data_o'
  valence = Column(Float)
  year = Column(Integer)
  acousticness = Column(Float)
  artists = Column(String)
  danceability = Column(Float)
  duration_ms = Column(Integer)
  energy = Column(Float)
  explicit = Column(Integer)
  id = Column(String, primary_key = True)
  instrumentalness = Column(Float)
  key = Column(Integer)
  liveness = Column(Float)
  loudness = Column(Float)
  mode = Column(Integer)
  name = Column(String)
  popularity = Column(Integer)
  release_date = Column(String)
  speechiness = Column(Float)
  tempo = Column(Float)


# In[20]:


dataWGenresColumns = inspector.get_columns('data_w_genres')
for c in dataWGenresColumns:
    print(c["name"],c["type"])


# In[21]:


class DataWGenres(Base):
  __tablename__ = 'data_w_genres'
  artists = Column(String, primary_key = True)
  acousticness = Column(Float)
  danceability = Column(Float)
  duration_ms = Column(Float)
  energy = Column(Float)
  instrumentalness = Column(Float)
  liveness = Column(Float)
  loudness = Column(Float)
  speechiness = Column(Float)
  tempo = Column(Float)
  valence = Column(Float)
  popularity = Column(Float)
  key = Column(Integer)
  mode = Column(Integer)
  count = Column(Integer)
  genres = Column(String)


# In[22]:


dataWGenresOColumns = inspector.get_columns('data_w_genres_o')
for c in dataWGenresOColumns:
    print(c["name"],c["type"])


# In[23]:


class DataWGenresO(Base):
  __tablename__ = 'data_w_genres_o'
  genres = Column(String)
  artists = Column(String, primary_key = True)
  acousticness = Column(Float)
  danceability = Column(Float)
  duration_ms = Column(Float)
  energy = Column(Float)
  instrumentalness = Column(Float)
  liveness = Column(Float)
  loudness = Column(Float)
  speechiness = Column(Float)
  tempo = Column(Float)
  valence = Column(Float)
  popularity = Column(Float)
  key = Column(Integer)
  mode = Column(Integer)
  count = Column(Integer)


# In[24]:


# # reflect an existing database into a new model
# Base = automap_base()

# # reflect the tables
# Base.prepare(engine, reflect=True)


# In[25]:


# # View all of the classes that automap found
# Base.classes.keys()


# In[26]:


Base.metadata.create_all(engine)


# In[27]:


# # Save references to each table
# Data = Base.classes.data
# dataByYear = Base.classes.data_by_year


# In[28]:


session = Session(bind=engine)


# In[29]:


#print all of the years in the DataByYear table
years = session.query(DataByYear)
for bob in years:
    print(bob.year)


# In[30]:


session.close()


# In[ ]:




