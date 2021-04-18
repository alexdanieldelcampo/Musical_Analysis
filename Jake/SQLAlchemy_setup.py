#!/usr/bin/env python
# coding: utf-8

# In[1]:


import numpy as np
import pandas as pd
import datetime as dt
import json
from flask import Flask, jsonify


# In[2]:


# Python SQL toolkit and Object Relational Mapper
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect

from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Float

from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()


# In[3]:


engine = create_engine("sqlite:///musicData.sqlite")


# In[4]:


session = Session(bind=engine)


# In[5]:


data = engine.execute("SELECT * from data")
dataJSON = json.dumps([dict(r) for r in data])


# In[6]:


dataO = engine.execute("SELECT * from data_o")
dataOJSON = json.dumps([dict(r) for r in dataO])


# In[7]:


dataByYear = engine.execute("SELECT * from data_by_year")
dataByYearJSON = json.dumps([dict(r) for r in dataByYear])


# In[8]:


dataByYearO = engine.execute("SELECT * from data_by_year_o")
dataByYearOJSON = json.dumps([dict(r) for r in dataByYearO])


# In[9]:


dataByArtist = engine.execute("SELECT * from data_by_artist")
dataByArtistJSON = json.dumps([dict(r) for r in dataByArtist])


# In[10]:


dataByArtistO = engine.execute("SELECT * from data_by_artist_o")
dataByArtistOJSON = json.dumps([dict(r) for r in dataByArtistO])


# In[11]:


dataByGenres = engine.execute("SELECT * from data_by_genres")
dataByGenresJSON = json.dumps([dict(r) for r in dataByGenres])


# In[12]:


dataByGenresO = engine.execute("SELECT * from data_by_genres_o")
dataByGenresOJSON = json.dumps([dict(r) for r in dataByGenresO])


# In[13]:


dataWithGenres = engine.execute("SELECT * from data_w_genres")
dataWithGenresJSON = json.dumps([dict(r) for r in dataWithGenres])


# In[14]:


dataWithGenresO = engine.execute("SELECT * from data_w_genres_o")
dataWithGenresOJSON = json.dumps([dict(r) for r in dataWithGenresO])


# In[15]:


# print(dataWithGenresJSON)


# In[ ]:




